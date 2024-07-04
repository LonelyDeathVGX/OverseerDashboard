"use client";

import { useGuild } from "@/lib/contexts/Guild";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Select, SelectItem } from "@nextui-org/react";
import { type ChangeEvent, useState } from "react";

const Languages: {
  key: string;
  label: string;
}[] = [
  {
    key: "en",
    label: "English",
  },
  {
    key: "es",
    label: "Spanish",
  },
];

export default function Page() {
  const { guild } = useGuild();
  const [language, setLanguage] = useState<string>("en");

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <main>
      <div className="py-12 flex items-center justify-center">
        <div className="max-w-[1024px] w-full px-6 flex flex-col gap-6">
          <Card>
            <CardHeader className="p-6 font-bold font-white text-xl">General Configuration</CardHeader>
            <Divider />
            <CardBody className="p-6">
              <Select
                label="Language"
                labelPlacement="outside"
                placeholder="Select a language"
                className="font-medium"
                onChange={handleLanguageChange}
              >
                {Languages.map((language) => (
                  <SelectItem key={language.key} value={language.key} className="font-medium">
                    {language.label}
                  </SelectItem>
                ))}
              </Select>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
