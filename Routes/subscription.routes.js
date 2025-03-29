import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.json({
    message: "Subscriptions",
  });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.json({
    message: "Subscriptions details",
  });
});

subscriptionRouter.post("/", (req, res) => {
  res.json({
    message: "Create Subscriptions",
  });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.json({
    message: "Update Subscriptions",
  });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.json({
    message: "Delete a Subscription",
  });
});
subscriptionRouter.get("/user/:id", (req, res) => {
  res.json({
    message: "Get all User Subscriptions",
  });
});

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.json({
    message: "Cancels Subscriptions",
  });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.json({
    message: "Get upcoming renewals",
  });
});

export default subscriptionRouter;
