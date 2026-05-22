<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Application;
use App\Models\Lead;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function adminIndex(Request $request)
    {
        $stored = $request->user()
            ->notifications()
            ->latest()
            ->take(30)
            ->get()
            ->map(fn ($notification) => $this->formatAdminNotification($notification));

        $recentActivity = $this->recentActivityFallback();
        $notifications = $stored
            ->merge($recentActivity)
            ->sortByDesc('created_at')
            ->unique('id')
            ->values()
            ->take(30);

        return response()->json(['notifications' => $notifications]);
    }

    public function markAdminRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->update(['read_at' => now()]);

        return response()->json(['success' => true]);
    }

    public static function alertAdmins(string $message, string $type = 'info'): void
    {
        Admin::query()->select('id')->chunkById(100, function ($admins) use ($message, $type) {
            foreach ($admins as $admin) {
                Notification::create([
                    'admin_id' => $admin->id,
                    'message' => $message,
                    'type' => $type,
                ]);
            }
        });
    }

    public static function alertUser(User $user, string $message, string $type = 'info'): Notification
    {
        return Notification::create([
            'user_id' => $user->id,
            'message' => $message,
            'type' => $type,
        ]);
    }

    private function formatAdminNotification(Notification $notification): array
    {
        return [
            'id' => $notification->id,
            'message' => $notification->message,
            'type' => $notification->type,
            'read_at' => $notification->read_at,
            'created_at' => $notification->created_at,
            'is_app' => in_array($notification->type, ['application', 'success'], true),
            'is_user' => in_array($notification->type, ['user', 'activation'], true),
        ];
    }

    private function recentActivityFallback()
    {
        $users = User::query()->latest()->take(8)->get()->map(fn ($user) => [
            'id' => 'recent_user_'.$user->id,
            'message' => "New user registered: {$user->name}",
            'type' => 'user',
            'read_at' => null,
            'created_at' => $user->created_at,
            'is_app' => false,
            'is_user' => true,
        ]);

        $applications = Application::query()->with('user')->latest()->take(8)->get()->map(function ($application) {
            $name = $application->user ? $application->user->name : 'Unknown user';
            return [
                'id' => 'recent_app_'.$application->id,
                'message' => "Loan request from {$name}: {$application->type} for {$application->amount}",
                'type' => 'application',
                'read_at' => null,
                'created_at' => $application->created_at,
                'is_app' => true,
                'is_user' => false,
            ];
        });

        $leads = Lead::query()
            ->whereIn('status', ['new_inquiry', 'contacted'])
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($lead) => [
                'id' => 'recent_lead_'.$lead->id,
                'message' => "Contact inquiry from {$lead->name}",
                'type' => 'lead',
                'read_at' => null,
                'created_at' => $lead->created_at,
                'is_app' => false,
                'is_user' => false,
            ]);

        return $users->merge($applications)->merge($leads);
    }
}
