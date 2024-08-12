import { Overseer } from "./Icons";
import { UseMediaQueryComponent } from "./UseMediaQuery";

export const LogoComponent = ({
  shouldHideLogo,
}: {
  shouldHideLogo?: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 font-bold text-xl">
      {shouldHideLogo ? (
        <UseMediaQueryComponent mediaQuery="(min-width: 512px)">
          <Overseer className="size-7" />
        </UseMediaQueryComponent>
      ) : (
        <Overseer className="size-7" />
      )}
      Overseer
    </div>
  );
};
