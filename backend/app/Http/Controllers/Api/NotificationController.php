<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function adminIndex(Request $request)
    {
        return response()->json([
            'notifications' => $request->user()
                ->notifications()
                ->latest()
                ->take(30)
                ->get()
                ->map(fn ($notification) => $this->formatAdminNotification($notification)),
        ]);
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
}
