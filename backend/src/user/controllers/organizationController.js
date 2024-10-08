const OrganizationService = require('../services/organizationService');
const jwt = require('../../../config/jwt');

class OrganizationController {

  static async getAllOrganizations(req, res) {
    try {
      const organizations = await OrganizationService.getAllOrganizations();
      res.status(200).json(organizations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrganizationById(req, res) {
    try {
      const organization = await OrganizationService.getOrganizationById(req.params.id);
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      res.status(200).json(organization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOrganizationIdByUserId(request, reply) {
    try {
      // const { userId } = request.user.id; // Get userId from the authenticated request
  
      const userId = jwt.verifyToken(request.headers['authorization'].split(' ')[1]).id;

      console.log('User ID:', userId);
      const organizationId = await OrganizationService.getOrganizationIdByUserId(userId);
      if (!organizationId) {
        return reply.code(404).send({ error: 'Organization not found for the user' });
      }
      reply.send({ organizationId });
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  static async createOrganization(req, res) {
    try {
      const newOrganization = await OrganizationService.createOrganization(req.body);
      res.status(201).json(newOrganization);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteOrganizationById(req, res) {
    try {
      const deleted = await OrganizationService.deleteOrganizationById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Organization not found' });
      }
      res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OrganizationController;
