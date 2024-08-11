import { CircleAlert } from "lucide-react";
import { Alert, AlertDescription } from "#ui/Alert";

export default () => {
  return (
    <div className="flex flex-col gap-6">
      <Alert variant="amber">
        <CircleAlert className="size-5" />
        <AlertDescription>This page is under construction.</AlertDescription>
      </Alert>
    </div>
  );
};
