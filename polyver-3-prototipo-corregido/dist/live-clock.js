// Use the viewer's device time and update again when returning from the background.
export function createLiveClock(React, jsx) {
  const currentTime = () => new Date().toLocaleTimeString('es-CL', {
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  return function LiveClock() {
    // Match the preserved static HTML before React mounts, then use local time.
    const [time, setTime] = React.useState('9:41');
    React.useEffect(() => {
      window.PolyverTheme?.refresh();
      const refresh = () => setTime(currentTime());
      refresh();
      const interval = window.setInterval(refresh, 1000);
      document.addEventListener('visibilitychange', refresh);
      return () => {
        window.clearInterval(interval);
        document.removeEventListener('visibilitychange', refresh);
      };
    }, []);
    return jsx.jsx('span', {className: 'live-clock', children: time});
  };
}
