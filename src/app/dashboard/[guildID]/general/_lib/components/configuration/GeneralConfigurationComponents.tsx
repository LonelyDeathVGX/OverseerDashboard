import { Loader2 } from "lucide-react";
import type { Dispatch, ReactElement, SetStateAction } from "react";
import { CircleFlag } from "react-circle-flags";
import useMutation from "swr/mutation";
import { Button } from "#components/ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "#components/ui/Select";
import { useToast } from "#components/ui/useToast";
import { makeClientRequest } from "#lib/Client";
import { Label } from "#ui/Label";

const Languages: Language[] = [
  {
    countryFlag: <CircleFlag countryCode="gb" className="size-5" />,
    isoCode: "en",
    label: "English",
  },
  {
    countryFlag: <CircleFlag countryCode="es" className="size-5" />,
    isoCode: "es",
    label: "Español",
  },
];
const updateGeneralConfiguration = async (
  url: string,
  {
    arg,
  }: {
    arg: object;
  },
) => {
  await makeClientRequest(url, {
    json: arg,
    method: "PUT",
  }).then(async (response) => response.json());
};

export const GeneralConfigurationSubmitComponent = ({
  localeState,
  guildID,
}: {
  localeState: LocaleState;
  guildID: string;
}) => {
  const { toast } = useToast();
  const { isMutating, trigger } = useMutation(
    `/api/dashboard/${guildID}/general/configuration`,
    updateGeneralConfiguration,
    {
      throwOnError: false,
      onSuccess: () =>
        toast({
          description: "The changes have been saved",
          variant: "emerald",
        }),
      onError: (error) =>
        toast({
          description: error.message,
          variant: "rose",
        }),
    },
  );
  const handleChanges = async () =>
    await trigger({
      locale: localeState[0],
    });

  return (
    <Button className="gap-2" disabled={isMutating} onClick={handleChanges}>
      {isMutating ? (
        <>
          <Loader2 className="size-5 animate-spin" />
          Loading...
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
};

export const GeneralConfigurationLanguageSelectComponent = ({
  localeState,
}: {
  localeState: LocaleState;
}) => {
  const [locale, setLocale] = localeState;

  return (
    <div className="flex flex-col gap-2">
      <Label>Language</Label>
      <Select defaultValue={locale} onValueChange={setLocale}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="p-3">
            {Languages.map((item) => (
              <SelectItem key={item.isoCode} value={item.isoCode}>
                <span className="flex items-center gap-2">
                  {item.countryFlag}
                  {item.label}
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

interface Language {
  countryFlag: ReactElement;
  isoCode: string;
  label: string;
}

type LocaleState = [string, Dispatch<SetStateAction<string>>];
