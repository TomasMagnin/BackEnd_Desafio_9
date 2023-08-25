import { TicketMongo } from "./models/tickets.model.js";

export class TicketMongo {
    async createTicket(){
        const ticket = TicketModel.create();
        return ticket;
    };
};