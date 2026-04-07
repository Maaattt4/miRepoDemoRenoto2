import Stripe from "stripe";
import { STRIPE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_KEY);

export const procesarPago = async (req, res) => {
    const sesion = await stripe.checkout.sessions.create({
        line_items:[{
            price_data: {
                product_data:{
                    name:'Laptop',
                    description: 'Gamer laptop',
                },
                currency:'mxn',
                unit_amount: 1000, 
            },
            quantity: 2, 
            },//producto laptop
            {
            price_data: {
                product_data:{
                    name:'Lavadora',
                    description: 'Lavadora whirlpool',
                },
                currency:'mxn',
                unit_amount: 2000, 
            },
            quantity: 2, 
            },//producto lavadora
        ],
        mode:"payment",
        success_url:'http://localhost:4000/exito',
        cancel_url:'http://localhost:4000/cancelado'
    });
    res.json(sesion);
};

//export default procesarPago;