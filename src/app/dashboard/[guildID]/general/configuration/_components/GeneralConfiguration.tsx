"use client";

import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { type ReactElement, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { makeClientRequest } from "#lib/Client";
import { Button } from "#ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Label } from "#ui/Label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "#ui/Select";
import { Separator } from "#ui/Separator";
import { useToast } from "#ui/useToast";

const Items: Item[] = [
  {
    label: "English",
    id: "en",
    flag: <CircleFlag countryCode="gb" className="size-5" />,
  },
  {
    label: "Español",
    id: "es",
    flag: <CircleFlag countryCode="es" className="size-5" />,
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
  const [locale, setLocale] = useState<string>(data.locale);
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: async () =>
      await makeClientRequest(`/api/dashboard/${guildID}/general/configuration`, {
        json: {
          locale,
        },
        method: "PUT",
      }),
    onError: (error) => {
      toast({
        description: error.message,
        title: "Request Error",
        variant: "rose",
      });
    },
    onSuccess: () => {
      toast({
        description: "The changes have been saved",
        title: "Request Success",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>General configuration</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Language</Label>
          <Select defaultValue={locale} onValueChange={setLocale}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="p-2">
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
        <Button className="gap-2" disabled={isPending} onClick={() => mutate()}>
          {isPending && <Loader2 className="size-5 animate-spin" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

interface Item {
  label: string;
  id: string;
  flag: ReactElement;
}
