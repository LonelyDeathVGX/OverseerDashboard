"use client";

import { Loader2 } from "lucide-react";
import { type ReactElement, useState } from "react";
import { CircleFlag } from "react-circle-flags";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [locale, setLocale] = useState<string>(data.locale);
  const { toast } = useToast();
  const handleChanges = async () => {
    setLoading(true);

    await fetch(`/api/dashboard/${guildID}/general/configuration`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        locale,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          toast({
            description: "The changes have been saved",
          });
        } else {
          const { data } = await response.json();

          toast({
            description: data,
            variant: "rose",
          });
        }
      })
      .finally(() => setLoading(false));
  };

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
        <Button disabled={loading} onClick={handleChanges} className="gap-2">
          {loading && <Loader2 className="size-5 animate-spin" />}
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
