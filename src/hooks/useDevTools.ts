import { useEffect, useRef } from "react";
import { SUPPORT_SERVER_URL } from "#lib/Constants";

export const useDevTools = ({
  onOpen,
  onClose,
}: {
  onOpen?: () => void;
  onClose?: () => void;
}) => {
  const devToolsOpen = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const threshold = 160;

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientationThreshold = window.innerWidth - window.innerHeight > threshold;

      if ((widthThreshold || heightThreshold || orientationThreshold) && !devToolsOpen.current) {
        devToolsOpen.current = true;

        const messages = [
          [
            "%cStop here!",
            "color: white; font-family: 'Lucida Console', monospace; font-size: 3rem; font-weight: 700; line-height: 1;",
          ],
          [
            "%cThis feature should only be used by Developers. If someone has told you that you have to copy/paste something here, you are probably being scammed and they will get your Discord token",
            "background-color: #4c0519; border-radius: 0.5rem; color: #fb7185; font-family: 'Lucida Console', monospace; font-weight: 500; padding: 1.5rem; width: 100%;",
          ],
          [
            `%cIf you see any vulnerability, please contact us at our support server: ${SUPPORT_SERVER_URL}`,
            "background-color: #083344; border-radius: 0.5rem; color: #22d3ee; font-family: 'Lucida Console', monospace; font-weight: 500; padding: 1.5rem; width: 100%;",
          ],
        ];

        for (const message of messages) {
          console.log(...message);
        }

        onOpen?.();
      } else if (!(widthThreshold || heightThreshold || orientationThreshold) && devToolsOpen.current) {
        devToolsOpen.current = false;

        onClose?.();
      }
    };

    const intervalID = setInterval(checkDevTools, 500);

    return () => clearInterval(intervalID);
  }, [devToolsOpen, onClose, onOpen]);
};
