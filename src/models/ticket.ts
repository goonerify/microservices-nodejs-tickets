import mongoose from "mongoose";

// Properties used to create a ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// A class that describes the properties of a Ticket Document/
// database row that can be accessed when using the model in code
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// A class that provides an interface to the database for reading,
// creating, querying, updating, deleting records, etc
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// An interface that defines the structure of a document, default values, validators, etc.
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    // Override the JSON representation of the serialized user model. Useful for
    // protecting sensitive information before transferring over HTTP for instance
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// The statics object allows us to add a new method to the model
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// The model provides us access to the collection (database table), in code
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
