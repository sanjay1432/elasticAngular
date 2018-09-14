import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SubMainComponent } from './sub-main/sub-main.component';
const routes: Routes = [
{
    path: '',
    component: MainComponent
},
{
    path: 'user',
    component: SubMainComponent
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
