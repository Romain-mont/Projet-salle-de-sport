const notFound = (req, res, next) => {
    res.status(404).json({ message: "Ressource non trouvée." });
};

export { notFound };