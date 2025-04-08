const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Week03 CSE341 API Docs',
    description: 'Movie API Documentation'
  },
  host: 'cse341-node-project-2025-1.onrender.com',
  schemes: ['https'],
  consumes: ['application/json'],
  definitions: {
    Movie: {
      
    }
  },

  // You can use the below to apply Oauth Security to 
  // your project and apply comment at your routes endpoint (Comments already added in routes and dont forget)
  // to update swagger.js file by adding the endpoint Oauth end points file.
  // securityDefinitions: {
  //   GitHubOAuth: {
  //     type: 'oauth2',
  //     flow: 'accessCode',
  //     authorizationUrl: 'https://github.com/login/oauth/authorize',
  //     tokenUrl: 'https://github.com/login/oauth/access_token',
  //     scopes: {
  //       user: 'Grants access to user profile',
  //     },
  //   },
  // },
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/moviesRoutes', './routes/genresRoutes']

// Generate swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc)

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./server.js')
// })

// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Week03 CSE341 API Docs',
//       version: '1.0.0',
//       description: 'Movie API Documentation',
//     },
//     servers: [{ url: 'http://localhost:3000' }], // Define the server
//     components: {
//       schemas: {
//         Movie: {
//           type: 'object',
//           properties: {
//             title: { type: 'string' },
//             director: { type: 'string' },
//             releaseYear: { type: 'integer' },
//             genre: { type: 'string' },
//             rating: { type: 'number' },
//             duration: { type: 'integer' },
//             cast: { type: 'array', items: { type: 'string' } },
//           },
//           example: {
//             title: "Training Day",
//             director: "Antoine Fuqua",
//             releaseYear: 2001,
//             genre: "Crime, Thriller",
//             rating: 7.7,
//             duration: 122,
//             cast: ["Denzel Washington", "Ethan Hawke", "Scott Glenn"],
//           },
//         },
//       },
//     },
//   },
//   apis: ['./routes/*.js'], // Include routes with Swagger comments
// };

// const swaggerSpec = swaggerJSDoc(options);

// module.exports = { swaggerUi, swaggerSpec };

// const swaggerSpec = swaggerJSDoc(options);

// module.exports = { swaggerUi, swaggerSpec };

// const swaggerJSDoc = require('swagger-jsdoc')

// const doc = {
//   info: {
//     title: 'Week03 CSE341 API Docs',
//     description: 'Movie API'
//   },
//   host: 'localhost:3000',
//   schemes: ['http'],
//   definitions: {
//     Contact: {
//       // Define contact schema
//       title: "Training Day",
//       director: "Antoine Fuqua",
//       releaseYear: 2001,
//       genre: "Crime, Thriller",
//       rating: 7.7,
//       duration: 122,
//       cast: ["Denzel Washington", "Ethan Hawke", "Scott Glenn"]
//     }
//   }
// }

// const outputFile = './swagger.json'
// const endpointsFiles = ['./routes/contactsRoute']

// // Generate swagger.json file
// swaggerJSDoc(outputFile, endpointsFiles, doc)

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./server.js')
// })

// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//   definition: {
//     openapi: '3.0.0', // OpenAPI version
//     info: {
//       title: 'My API',
//       version: '1.0.0',
//       description: 'A simple Express API documented with Swagger JSDoc',
//     },
//     servers: [
//       {
//         url: 'http://localhost:3000', // Update this with your server URL
//       },
//     ],
//   },
//   apis: ['./routes/*.js'], // Path to the API docs (update as needed)
// };
