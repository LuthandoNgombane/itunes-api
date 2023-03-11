const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);

describe("Test iTunes API", () => {
  describe("Get /favourites", () => {
    it("It should GET 2 the favourites with specified IDs", (done) => {
      chai
        .request(server)
        .get("/favourites")
        .query({ idArray: JSON.stringify([1453893304, 811377230]) })
        .end((err, response) => {
            expect(response).to.have.status(200);
            expect(response.body.results).to.have.lengthOf(2);
          done();
        });
    });

    it("It should NOT GET any favourites with specified IDs", (done) => {
      chai
        .request(server)
        .get("/favourites")
        .query({ idArray: JSON.stringify([110204, 81230]) })
        .end((err, response) => {
          expect(response).to.have.status(200);
          expect(response.body.results).to.have.lengthOf(0);
          done();
        });
    });
  });
});
