import {appRoutes, validSelection, personForProfile, trustedMessage} from './integration-contract.js';

export function createIntegratedChat(React, jsxRuntime) {
  return function IntegratedChat(props) {
    const frame = React.useRef(null);
    const latest = React.useRef(props);
    latest.current = props;
    function sendContext() {
      const current = latest.current;
      frame.current?.contentWindow?.postMessage({type:'polyver:context', personId:personForProfile(current.profile), displayName:current.profile.name, deityId:current.cupid.id, visible:current.visible}, location.origin);
    }
    React.useEffect(() => {
      function receive(event) {
        if (!trustedMessage(event, frame.current?.contentWindow, location.origin)) return;
        const data = event.data;
        if (data?.type === 'polyver:ready') sendContext();
        if (data?.type === 'polyver:selection' && validSelection(data)) latest.current.onChatSelection(data);
        if (data?.type === 'polyver:navigate' && appRoutes.includes(data.route)) latest.current.onNavigate(data.route);
      }
      window.addEventListener('message', receive);
      window.PolyverTheme?.refresh();
      return () => window.removeEventListener('message', receive);
    }, []);
    React.useEffect(sendContext, [props.profile, props.cupid.id, props.visible]);
    return jsxRuntime.jsx('iframe', {ref:frame, src:'/chat.html?embedded=1', title:`Chat con ${props.cupid.name}`, className:'integrated-chat-frame', onLoad:sendContext});
  };
}
