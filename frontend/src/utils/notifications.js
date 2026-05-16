import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

/**
 * Premium Notification System using SweetAlert2
 * Configured with luxury aesthetics for Black Wolves Acquisition LLC
 */

const luxuryTheme = {
    background: '#05101c',
    color: '#ffffff',
    customClass: {
        popup: 'rounded-[2rem] border border-white/10 shadow-2xl',
        title: 'text-[#c5a059] font-black uppercase italic tracking-tighter',
        confirmButton: 'bg-[#c5a059] text-white font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#c5a059]/20',
        cancelButton: 'bg-white/5 text-slate-300 font-black px-10 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5'
    },
    buttonsStyling: false
};

const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    background: '#05101c',
    color: '#ffffff',
    customClass: {
        popup: 'rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl',
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

export const notify = {
    success: (title, text) => {
        Toast.fire({
            icon: 'success',
            iconColor: '#c5a059',
            title: `<span style="color:#c5a059; font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:0.1em;">${title}</span>`,
            text: text,
        });
    },
    error: (title, text) => {
        Toast.fire({
            icon: 'error',
            iconColor: '#ef4444',
            title: `<span style="color:#ef4444; font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:0.1em;">${title}</span>`,
            text: text || 'An unexpected protocol failure occurred.',
        });
    },
    warning: (title, text) => {
        Toast.fire({
            icon: 'warning',
            iconColor: '#f59e0b',
            title: `<span style="color:#f59e0b; font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:0.1em;">${title}</span>`,
            text: text,
        });
    },
    info: (title, text) => {
        Toast.fire({
            icon: 'info',
            iconColor: '#3b82f6',
            title: `<span style="color:#3b82f6; font-weight:900; font-size:12px; text-transform:uppercase; letter-spacing:0.1em;">${title}</span>`,
            text: text,
        });
    },
    confirm: async (title, text, confirmButtonText = 'PROCEED') => {
        return MySwal.fire({
            ...luxuryTheme,
            title: title,
            text: text,
            icon: 'warning',
            iconColor: '#c5a059',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'ABORT',
        });
    }
};
