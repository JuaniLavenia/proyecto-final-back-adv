jest.mock("../models/User");
jest.mock("../loggers/logger");

const User = require("../models/User");
const logger = require("../loggers/logger");

/* TESTING CON JEST.FN() */
const {
  getUsers,
  deleteUser,
  getUserInfo,
  updateUser,
} = require("../controllers/users.controller");

describe("getUsers", () => {
  beforeEach(() => jest.resetAllMocks());

  test("debería devolver todos los usuarios correctamente", async () => {
    const mockUsers = [
      { _id: 1, username: "User 1" },
      { _id: 2, username: "User 2" },
    ];
    User.find.mockResolvedValue(mockUsers);

    const mockedReq = {};
    const mockedRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUsers(mockedReq, mockedRes);

    expect(User.find).toHaveBeenCalledTimes(1);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Lista de usuarios",
      usuarios: mockUsers,
    });
  });
});

describe("deleteUser", () => {
  beforeEach(() => jest.resetAllMocks());

  test("debería eliminar un usuario correctamente", async () => {
    const mockUserId = "123";
    User.findByIdAndDelete.mockResolvedValue({
      id: mockUserId,
      name: "User 1",
    });

    const mockedReq = { params: { id: mockUserId } };
    const mockedRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await deleteUser(mockedReq, mockedRes);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockUserId);
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Usuario eliminado correctamente",
    });
  });
});

describe("getUserInfo", () => {
  beforeEach(() => jest.resetAllMocks());

  test("debería devolver la información de un usuario cuando existe", async () => {
    const mockUser = {
      _id: "1",
      username: "User1",
      email: "user1@example.com",
      subscription: "Basic",
    };
    User.findById.mockResolvedValue(mockUser);

    const mockedReq = { params: { id: "1" } };
    const mockedRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getUserInfo(mockedReq, mockedRes);

    expect(User.findById).toHaveBeenCalledWith("1", {
      email: 1,
      _id: 1,
      username: 1,
      subscription: 1,
    });
    expect(mockedRes.status).toHaveBeenCalledWith(200);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Info del usuario",
      usuario: mockUser,
    });
  });

  test("debería devolver un error 404 si el usuario no existe", async () => {
    User.findById.mockResolvedValue(null);

    const mockedReq = { params: { id: "1" } };
    const mockedRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getUserInfo(mockedReq, mockedRes);

    expect(User.findById).toHaveBeenCalledWith("1", {
      email: 1,
      _id: 1,
      username: 1,
      subscription: 1,
    });
    expect(mockedRes.status).toHaveBeenCalledWith(404);
    expect(mockedRes.json).toHaveBeenCalledWith({
      message: "Usuario no encontrado",
    });
  });
});

describe("updateUser", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*it("debería actualizar un usuario existente y devolverlo", async () => {
    const mockUser = {
      _id: "123",
      email: "updated@example.com",
      username: "updateduser",
    };
    const req = {
      params: { id: "123" },
      body: { email: "updated@example.com", username: "updateduser" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.findByIdAndUpdate.mockResolvedValueOnce(mockUser);

    await updateUser(req, res);
    console.log("RESPUESTA", res);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { email: "updated@example.com", username: "updateduser" },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario modificado",
      usuario: mockUser,
    });
  });*/

  it("debería devolver un error 404 si el usuario no existe", async () => {
    const req = { params: { id: "123" }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    User.findByIdAndUpdate.mockResolvedValueOnce(null);

    await updateUser(req, res);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {},
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  it("debería devolver un error 500 si ocurre un error al actualizar el usuario", async () => {
    const req = { params: { id: "123" }, body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockError = new Error("Test error");

    User.findByIdAndUpdate.mockRejectedValueOnce(mockError);

    await updateUser(req, res);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {},
      { new: true }
    );
    expect(logger.error).toHaveBeenCalledWith(
      "Error al modificar el usuario",
      mockError
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al modificar el usuario",
    });
  });
});
