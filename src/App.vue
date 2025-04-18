<template>
  <v-app>
    <v-navigation-drawer app v-if="!$route.meta.hideLayout">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Crud Api
          </v-list-item-title>
          <v-list-item-subtitle>
            Node.js - Vue.js 
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home-analytics</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/">
                Dashboard
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>


        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/users">
                Users
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-domain</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link to="/companies">
                Companies
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar app v-if="!$route.meta.hideLayout">
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- <v-div id="home_div">
          <img alt="Vue logo" src="./assets/logo.png">
          <HelloWorld msg="Welcome to Your Vue.js App"/>
        </v-div> -->
         <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>


