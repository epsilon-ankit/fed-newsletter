import { DashboardComponent } from "../dashboard/dashboard.component";
import { LoginComponent } from "../login/login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../app-guard/auth.guard";
import { AddComponent } from "../project/add/add.component";
import { StatusComponent } from "../project/status/status.component";
import { ViewAllComponent } from "../project/view-all/view-all.component";
import { ViewDetailComponent } from "../project/view-detail/view-detail.component";
import { ResultComponent } from "../search/result/result.component";
import { EventComponent } from "../event/event/event.component";
import { AdminDashboardComponent } from "../admin/admin-dashboard/admin-dashboard.component";
import { ArtifactsComponent } from '../artifacts/artifacts.component';

export const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "home", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "add", component: AddComponent, canActivate: [AuthGuard] },
    {
        path: "statupdate",
        component: StatusComponent,
        canActivate: [AuthGuard],
    },
    {
        path: "projects",
        canActivate: [AuthGuard],
        children: [
            {
                path: "deatil/:id",
                component: ViewDetailComponent,
            },
            {
                path: "",
                component: ViewAllComponent,
                pathMatch: "full",
            },
        ],
    },
    { path: "search", component: ResultComponent, canActivate: [AuthGuard] },
    { path: "events", component: EventComponent, canActivate: [AuthGuard] },
    { path: "artifacts", component: ArtifactsComponent, canActivate: [AuthGuard] },
    {
        path: "admin",
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
        data: {
            role: "admin",
        },
    },
    {
        path: "**",
        redirectTo: "login",
        pathMatch: "full",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class RouteModule {}
