const controller = {
    administrar: (req, res) => {
        res.render('admin/administrar')
    },
    create: (req, res) => {
        res.render('admin/crear')
    }
}

module.exports = controller