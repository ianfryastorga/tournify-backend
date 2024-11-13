const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.get("players.list", "/", async (ctx) => {
    try {
        const players = await ctx.orm.Player.findAll();
        ctx.body = players;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, `Error fetching players: ${error.message}`);
    }
});

router.get("players.show", "/:id", async (ctx) => {
    try {
        const player = await ctx.orm.Player.findByPk(ctx.params.id);
        if (!player) {
            ctx.throw(404);
        }
        ctx.body = player;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.get("players.byTournamentSlug", "/tournamentSlug/:slug", async (ctx) => {
    try {
        const tournament = await ctx.orm.Tournament.findOne({ where: { id: ctx.params.slug } });
        if (!tournament) {
            ctx.throw(404, "Tournament not found");
        }
        const teams = await ctx.orm.Team.findAll({ where: { tournamentId: tournament.id } });
        const players = await ctx.orm.Player.findAll({
            where: {
                teamId: teams.map(team => team.id)
            }
        });
        console.log(players);
        ctx.body = players;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, `Error fetching players for tournament: ${error.message}`);
    }
});

module.exports = router;
