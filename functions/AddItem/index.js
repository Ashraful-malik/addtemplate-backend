const { templates } = require("../../model/Template");
const { Users } = require("../../model/user.js");

async function user(req, res) {
  const user = req.payload;
  const authUser = await Users.findById(user.aud, { password: 0 }).exec();
  res.send(authUser);
}

function createTemplate(req, res) {
  const { templateName, codelink, description, imageUrl } = req.body;
  const newTemplate = new templates({
    name: templateName,
    link: codelink,
    details: description,
    image: imageUrl,
  });

  newTemplate.save((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      //   console.log(result);
    }
  });
}
async function getAllTemplates(req, res) {
  try {
    const allTemplates = await templates.find({});
    res.send(allTemplates);
  } catch (error) {
    res.send(error);
  }
}

async function templateById(req, res) {
  try {
    const data = await templates.findById(req.params.id).exec();
    res.send(data);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function deletetemplate(req, res) {
  try {
    const response = await templates.findByIdAndDelete(req.params.id);
    res.send("delete successful");
  } catch (error) {
    res.status(500).send(error);
  }
}
module.exports = {
  user,
  createTemplate,
  getAllTemplates,
  templateById,
  deletetemplate,
};
