import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("w-4 h-4 animate-spin", className)}
      {...props}
    />
  );
}

export default Spinner;
