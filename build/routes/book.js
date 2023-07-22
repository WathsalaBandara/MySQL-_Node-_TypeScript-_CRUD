"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var book_1 = __importDefault(require("../controller/book"));
var router = express_1.default.Router();
router.post('/', book_1.default.createBook);
router.get('/', book_1.default.getAllBooks);
router.get('/:bookId', book_1.default.getoneBooks);
router.put('/:bookId', book_1.default.updateBook);
router.delete('/:bookId', book_1.default.deleteBook);
module.exports = router;
