// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
//import "https://deno.land/std@0.168.0/http/server.ts"

import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { stripe } from '../_utils/stripe.ts'

console.log("Hello from Functions!")

Deno.serve(async (req) => {
  console.log("--- 0")
  try {

    console.log("--- a")

    const { amount } = await req.json()

    const paymetIntent = await stripe.paymentIntents.create({
      amount: 1049,
      currency: 'usd',

    })

    const res = {
      paymentIntent: paymetIntent.client_secret,
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY')
    }

    console.log("--- b")
    return new Response(
      JSON.stringify(res),
      { headers: { "Content-Type": "application/json" } },
    )


  } catch (error) {
    console.log(error)

    return new Response(
      JSON.stringify(error),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      },)


  }



})


/* To invoke locally:

  1. Run `supabase start` (start docker desktop)
  2. npx supabase functions serve --env-file .env payment-sheet
  3. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Mithat"}'

*/
