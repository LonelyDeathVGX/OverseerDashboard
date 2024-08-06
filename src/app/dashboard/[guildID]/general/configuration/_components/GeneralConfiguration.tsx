"use client";

import { type ReactElement, useEffect } from "react";
import { CircleFlag } from "react-circle-flags";
import { useFormState } from "react-dom";
import { updateGeneralConfiguration } from "#actions/Configuration";
import { useToast } from "#components/ui/useToast";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Label } from "#ui/Label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "#ui/Select";
import { Separator } from "#ui/Separator";
import { GeneralConfigurationSubmitComponent } from "./GeneralConfigurationSubmit";

const Items: Item[] = [
  {
    flag: <CircleFlag countryCode="gb" className="size-5" />,
    id: "en",
    label: "English",
  },
  {
    flag: <CircleFlag countryCode="es" className="size-5" />,
    id: "es",
    label: "Español",
  },
];

export function GeneralConfigurationComponent({
  data,
  guildID,
}: {
  data: {
    locale: string;
  };
  guildID: string;
}) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(updateGeneralConfiguration, {
    message: "",
    success: false,
  });

  useEffect(() => {
    const { message, success } = state;

    toast({
      description: message,
      variant: success ? "emerald" : "rose",
    });
  }, [toast, state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>General configuration</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="guildID" value={guildID} />
          <div className="flex flex-col gap-2">
            <Label>Language</Label>
            <Select defaultValue={data.locale} name="locale">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="p-3">
                  {Items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      <span className="flex items-center gap-2">
                        {item.flag}
                        {item.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <GeneralConfigurationSubmitComponent />
        </form>
      </CardContent>
    </Card>
  );
}

interface Item {
  flag: ReactElement;
  id: string;
  label: string;
}
