const Router = require("koa-router");
const dotenv = require("dotenv");

dotenv.config();

const router = new Router();

router.post("teams.create", "/", async (ctx) => {
    try {
        const team = await ctx.orm.Team.create(ctx.request.body);
        ctx.body = team;
        ctx.status = 201;
    } catch (error) {
        ctx.throw(400, error);
    }
});

router.post("teams.add_user", "/add_user", async (ctx) => {
    try {
        const data = ctx.request.body;
        const team = await ctx.orm.Team.findByPk(data.teamId);
        if (!team) {
            ctx.throw(404, 'Team not found');
        }

        const user = await ctx.orm.User.findByPk(data.userId);
        if (!user) {
            ctx.throw(404, 'User not found');
        }

        // Verify if user is already in team
        const repeatedPlayer = await ctx.orm.Player.findOne({
            where: {
                teamId: data.teamId,
                userId: data.userId,
            },
        });

        if (repeatedPlayer) {
            ctx.throw(400, 'User already in team');
        }

        const player = await ctx.orm.Player.create({
            teamId: data.teamId,
            userId: data.userId,
            name: "Jugador",
        });

        ctx.body = player;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});




router.get("teams.players", "/get_players/:id", async (ctx) => {
    try {
        const teamId = ctx.params.id;
        const team = await ctx.orm.Team.findByPk(teamId, {
            include: [{
              model: ctx.orm.Player,
              include: [ctx.orm.User]
            }]
        });

        if (!team) {
            ctx.throw(404, 'Team not found');
        }

        const playersId = await ctx.orm.Player.findAll({
            where: {
                teamId: ctx.params.id,
            },
        });

        const users = await ctx.orm.User.findAll({
            where: {
                id: playersId.map(player => player.userId),
            },
        });

        ctx.body = users;
        ctx.status = 200;
        
    } catch (error) {
        ctx.throw(400, error);
    }
});

// router.get("teams.list", "/", async (ctx) => {
//     try {
//         const teams = await ctx.orm.Team.findAll();
//         ctx.body = teams;
//         ctx.status = 200;
//     } catch (error) {
//         ctx.throw(400, error);
//     }
// });
router.get("/teams_with_players", "/", async (ctx) => {
    try {
      const teams = await ctx.orm.Team.findAll({
        include: [{
          model: ctx.orm.Player,
          include: [{
            model: ctx.orm.User,
            attributes: ['name'] // Selecciona solo el nombre del usuario
          }]
        }]
      });
  
      if (!teams) {
        ctx.throw(404, 'No teams found');
      }
  
      // Formatea la respuesta para incluir solo los atributos necesarios
      const formattedTeams = teams.map(team => ({
        id: team.id,
        name: team.name,
        captainId: team.captainId,
        players: team.Players.map(player => player.User ? player.User.name : null), // Solo nombres de los jugadores
        points: team.points,
        matchesPlayed: team.matchesPlayed,
        matchesWon: team.matchesWon,
        matchesDrawn: team.matchesDrawn,
        matchesLost: team.matchesLost,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst,
        goalDifference: team.goalDifference,
        tournamentSlug: team.tournamentSlug,
      }));
  
      ctx.body = formattedTeams;
      ctx.status = 200;
  
    } catch (error) {
      ctx.throw(400, error);
    }
  });
  
  

router.get("teams.show", "/:id", async (ctx) => {
    try {
        const team = await ctx.orm.Team.findByPk(ctx.params.id);
        if (!team) {
            ctx.throw(404);
        }
        ctx.body = team;
        ctx.status = 200;
    } catch (error) {
        ctx.throw(400, error);
    }
});

module.exports = router;
