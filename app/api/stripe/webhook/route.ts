import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK_KEY!);
const endpointSecret = process.env.ENDPOINT_SECRET!;

export async function POST(requset: any) {
	const rawBody = await buffer(requset.body);
	let event;
	try {
		const sig = headers().get("stripe-signature");

		event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
	} catch (err: any) {
		return Response.json({ error: "Webhook error" + err?.message });
	}

	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntentSucceeded = event.data.object;
			console.log(paymentIntentSucceeded);
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}
	return Response.json({});
}
