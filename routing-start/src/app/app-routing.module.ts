import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate.guard";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResover } from "./servers/server.resolver";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRouter: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "users", component: UsersComponent, children: [
            { path: ":id/:name", component: UserComponent },
        ]
    },
    {
        path: "servers",
        // canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
            {
                path: ":id",
                component: ServerComponent,
                resolve: { "servers": ServerResover }
            },
            {
                path: ":id/edit",
                component: EditServerComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    },
    // { path: "not-found", component: PageNotFoundComponent },
    { path: "not-found", component: ErrorPageComponent, data: { message: "This page is not available!" } },
    { path: "**", redirectTo: "/not-found" }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRouter)
        //RouterModule.forRoot(appRouter, {useHash:true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}