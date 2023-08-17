import { Store } from "pullstate";

export const CardStore = new Store({
    card_colors: [
        "black",
        "blue",
    ],
    card_types: [
        "visa",
        "mastercard"
    ]
});