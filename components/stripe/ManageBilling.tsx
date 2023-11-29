import React from "react";
import { Button } from "../ui/button";
import { BackpackIcon } from "@radix-ui/react-icons";

export default function ManageBilling() {
	return (
		<Button
			className="flex items-center justify-between w-full"
			variant="ghost"
		>
			Billing
			<BackpackIcon />
		</Button>
	);
}
