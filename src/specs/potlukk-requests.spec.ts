import nock from "nock";
import { CreateDish, DishCreation } from "../api/potlukk-requests";

describe("CreateDish", () => {
  const dish: DishCreation = {
    potlukkId: 1,
    dishes: {
      name: "Pizza",
      description: "A delicious pizza",
      broughtBy: 1,
      serves: 4,
      allergens: ["dairy"]
    }
  };

  it("should create a new dish successfully", async () => {
    const scope = nock("http://127.0.0.1:8000")
      .post("/graphql")
      .reply(200, {
        data: {
          createPotlukk: {
            potlukkId: 1
          }
        }
      });

    const result = await CreateDish(dish);

    expect(result).toEqual({ potlukkId: 1 });

    expect(scope.isDone()).toBe(true);
  });

  it("should throw an error on failure", async () => {
    const scope = nock("http://127.0.0.1:8000")
      .post("/graphql")
      .replyWithError("Server is down");

    await expect(CreateDish(dish)).rejects.toThrow();

    expect(scope.isDone()).toBe(true);
  });
});

