const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.get("teamregistrations.list", "/", async (ctx) => {
    try {
        const teamRegistrations = await ctx.orm.TeamRegistration.findAll();
        ctx.body = teamRegistrations;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, `Error fetching team registrations: ${error.message}`);
    }
});

router.get("teamregistrations.byTournament", "/tournamentSlug/:slug", async (ctx) => {
    try {
        const { slug } = ctx.params;
        const teamRegistrations = await ctx.orm.TeamRegistration.findAll({
            where: { tournamentSlug: slug }
        });
        if (teamRegistrations.length === 0) {
            ctx.throw(404, "No se encontraron registraciones de equipos para este torneo.");
        }
        ctx.body = teamRegistrations;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, `Error fetching team registrations: ${error.message}`);
    }
});

router.post("teamregistrations.create", "/", async (ctx) => {
    try {
        const { teamId, tournamentSlug } = ctx.request.body;

        const team = await ctx.orm.Team.findByPk(teamId);
        if (!team) {
            ctx.throw(404, "Team not found");
        }
        const tournament = await ctx.orm.Tournament.findOne({ where: { slug: tournamentSlug } });
        if (!tournament) {
            ctx.throw(404, "Tournament not found");
        }
        const teamRegistration = await ctx.orm.TeamRegistration.create({
            teamId: team.id,
            tournamentSlug: tournament.slug,
            status: "Pendiente", 
        });

        ctx.body = { message: "Team registration created successfully", teamRegistration };
        ctx.status = 201;
    } catch (error) {
        ctx.throw(400, `Error creating team registration: ${error.message}`);
    }
});


router.patch("teamregistrations.updateStatus", "/:id/status", async (ctx) => {
    try {
        const { id } = ctx.params;
        const { status } = ctx.request.body;

        if (!["Aceptado", "Rechazado"].includes(status)) {
            ctx.throw(400, "Invalid status. Status must be 'Aceptado' or 'Rechazado'.");
        }

        const teamRegistration = await ctx.orm.TeamRegistration.findByPk(id);
        if (!teamRegistration) {
            ctx.throw(404, "Team registration not found");
        }
        teamRegistration.status = status;
        await teamRegistration.save();

        ctx.body = { message: "Status updated successfully", teamRegistration };
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, `Error updating team registration status: ${error.message}`);
    }
});


module.exports = router;
