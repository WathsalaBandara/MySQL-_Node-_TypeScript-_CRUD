import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Books';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books');

    let { author, title } = req.body;

    let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');

    let query = 'SELECT * FROM books';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};
const getoneBooks = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one book.');

    let bookId = req.params.bookId;

    let query = `SELECT * FROM books WHERE id = ${bookId}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved book: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Deleting book.');

    //let bookId = req.body.bookId;
    const bookId = req.params.bookId;

    let query = `DELETE FROM books WHERE id = ${bookId}`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book deleted: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating book.');

    const bookId = req.params.bookId;
    const author = req.body.author;
    const title = req.body.title;

    const query = `UPDATE books SET author = "${author}", title = "${title}" WHERE id = ${bookId}`;

    const connection = await Connect();
    const result = await Query(connection, query);

    if (result) {
        logging.info(NAMESPACE, 'Book updated: ', result);

        return res.status(200).json({
            result
        });
    } else {
        logging.error(NAMESPACE, 'Book could not be updated.');

        return res.status(500).json({
            message: 'Book could not be updated.'
        });
    }
};

export default { createBook, getAllBooks, updateBook, deleteBook, getoneBooks };
