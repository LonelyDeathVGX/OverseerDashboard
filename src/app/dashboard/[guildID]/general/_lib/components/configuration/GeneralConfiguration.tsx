"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "#ui/Card";
import { Separator } from "#ui/Separator";
import {
  GeneralConfigurationLanguageSelectComponent,
  GeneralConfigurationSubmitComponent,
} from "./GeneralConfigurationComponents";

export const GeneralConfigurationComponent = ({
  data,
  guildID,
}: {
  data: {
    locale?: string;
    timezone?: string;
    use12Hours?: boolean;
  };
  guildID: string;
}) => {
  const localeState = useState<string>((data.locale ?? "en").toLowerCase());

  return (
    <Card>
      <CardHeader>
        <CardTitle>General configuration</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <GeneralConfigurationLanguageSelectComponent localeState={localeState} />
        </div>
        <GeneralConfigurationSubmitComponent localeState={localeState} guildID={guildID} />
      </CardContent>
    </Card>
  );
};
