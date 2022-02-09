module.exports = async (req, res) => {
  const tokens = process.env.ALLOWED_TOKENS.split("|");
  if (tokens.includes(decodeURI(req.query.token))) {
    res.json({
      all: [
        {
          title: "Adrien's Supermarket",
          url: "https://www.adrienssupermarket.com/",
          labels: ["all"],
        },
        {
          title: "Bill's Cashsaver",
          url: "https://billscashsaver.com/",
          labels: ["all"],
        },
        {
          title: "Bill's Cost Plus",
          url: "https://billscostplus.com/",
          labels: ["all"],
        },
        {
          title: "Cashsaver South",
          url: "https://www.cashsaversouth.com/",
          labels: ["all"],
        },
        {
          title: "Epic Cybernetics",
          url: "https://epiccybernetics.com/",
          labels: ["all", "nf"],
        },
        {
          title: "Epic Solutions",
          url: "https://epicsolutions.com/",
          labels: ["all", "nf"],
        },
        {
          title: "Fasullo's Piggly Wiggly",
          url: "https://wegopig.com/",
          labels: ["all"],
        },
        {
          title: "Food Giant",
          url: "https://shopfoodgiant.com/",
          labels: ["all"],
        },
        {
          title: "High Point Grocery",
          url: "https://highpointgrocerystore.com/",
          labels: ["all"],
        },
        {
          title: "Mac's Fresh Market",
          url: "https://macsfreshmarket.com/",
          labels: ["all"],
        },
        {
          title: "Market Place Grocery",
          url: "https://marketplacegrocery.com/",
          labels: ["all"],
        },
        {
          title: "Pig Perks (Dale's)",
          url: "https://gotopigperks.com/",
          labels: ["all", "ll"],
        },
        {
          title: "Piggly Wiggly LA South",
          url: "https://www.gotothepig.com/",
          labels: ["all", "ll"],
        },
        {
          title: "Piggly Wiggly FL South",
          url: "https://pigglywigglysouth.com/",
          labels: ["all"],
        },
        {
          title: "Save-A-Lot SW Florida",
          url: "https://savealotswfl.com/",
          labels: ["all"],
        },
        {
          title: "Splash and Dash",
          url: "https://splashndashdecatur.com/",
          labels: ["all", "nf"],
        },
        {
          title: "Sullivan's Grocery",
          url: "https://sullivansgroc.com/",
          labels: ["all", "ll"],
        },
        {
          title: "Teet's Food Store",
          url: "https://savers.teetsfoodstore.com/",
          labels: ["all", "ll"],
        },
        {
          title: "Vowell's Cashsaver",
          url: "https://www.cashsaverbyvowells.com/",
          labels: ["all"],
        },
        {
          title: "Vowell's Marketplace",
          url: "https://vowellsmarketplace.com/",
          labels: ["all"],
        },
      ],
    });
  }
};
