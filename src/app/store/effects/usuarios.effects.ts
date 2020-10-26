import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';




@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ), //Aqui escuchas la accion
      //      tap( data => console.log('effect tap' , data)), //hago un tap para que se muestre en consola la informacion que va fluyendo despues de este oftype
            mergeMap(  //el merge es para unir este observable a la solicitud anterior 
                () => this.usuariosService.getUsers()
                    .pipe(
                  //    tap(data => console.log('getUsers effect', data))
                        map ( users => usuariosActions.cargarUsuariosSuccess( {usuarios: users}) ),
                        catchError( err => of (usuariosActions.cargarUsuariosError({ payload: err})) )
            )
        )
    ))
}