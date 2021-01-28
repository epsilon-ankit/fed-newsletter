const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  oppName: {
    type: String,
    required: true,
  },
  oppDesc: {
    type: String
  },
  dealValue: {
    type: Number,
  },
  dxValue: {
    type: Number,
  },
  oppStatus: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  probility: {
    type: Number,
  },
  dealCloseDate: {
    type: Object,
  },
  estStartDate: {
    type: Object,
  },
  salesForceURL: {
    type: String,
  },
  artifactsURL: {
    type: String,
  },
  dxPursuitLead: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true
  }],
  dxLeadEmail: {
    type: String,
    required: true
  },
  salesRepresentative: {
    type: String,
    required: true,
  },
  statusUpdate: {
    type: String,
    trim: true
  },
  history: [{
    dealValue: {
      type: Number
    },
    dxValue: {
      type: Number
    },
    oppDesc: {
      type: String
    },
    oppStatus: {
      type: String
    },
    domain: {
      type: String
    },
    probility: {
      type: String
    },
    dealCloseDate: {
      type: Object
    },
    estStartDate: {
      type: Object
    },
    salesForceURL: {
      type: String
    },
    artifactsURL: {
      type: String
    },
    dxPursuitLead: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true
    }],
    dxLeadEmail: {
      type: String,
      required: true
    },
    salesRepresentative: {
      type: String,
      required: true
    },
    statusUpdate: {
      type: String
    },
    updateDate: {
      type: Date, default: Date.now
    }
  }],
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  }
}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
  const schema = {
    clientName: Joi.string().required(),
    oppName: Joi.string().required(),
    oppDesc: Joi.string().allow(''),
    dealValue: Joi.number().allow(''),
    dxValue: Joi.number().allow(''),
    oppStatus: Joi.string().required(),
    domain: Joi.string().required(),
    probility: Joi.number().allow(''),
    dealCloseDate: Joi.object().allow(null).allow(''),
    estStartDate: Joi.object().allow(null).allow(''),
    salesForceURL: Joi.string().allow(''),
    artifactsURL: Joi.string().allow(''),
    dxPursuitLead: Joi.string().required(),
    dxLeadEmail: Joi.string().required(),
    salesRepresentative: Joi.string().required(),
    statusUpdate: Joi.string().allow(''),
    email: Joi.string().min(5).max(255).required().email(),
  };

  return Joi.validate(project, schema);
}

function updateValidateProject(project) {
  const schema = {
    dealValue: Joi.number().allow('').allow(null),
    dxValue: Joi.number().allow('').allow(null),
    oppDesc: Joi.string().allow('').allow(null),
    oppStatus: Joi.string().required(),
    domain: Joi.string().required(),
    probility: Joi.number().allow('').allow(null),
    dealCloseDate: Joi.object().allow(null).allow(''),
    estStartDate: Joi.object().allow(null).allow(''),
    salesForceURL: Joi.string().allow('').allow(null),
    artifactsURL: Joi.string().allow('').allow(null),
    dxPursuitLead: Joi.string().required().allow(null),
    dxLeadEmail: Joi.string().required().allow(null),
    salesRepresentative: Joi.string().required(),
    statusUpdate: Joi.string().allow('').allow(null),
  };

  return Joi.validate(project, schema);
}

exports.projectSchema = projectSchema;
exports.Project = Project;
exports.validate = validateProject;
exports.UpdateValidate = updateValidateProject;
