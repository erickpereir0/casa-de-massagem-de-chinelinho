import 'angular/angular.js'
import '../compartilhado/estilos.css'
import { formatarPreco } from '../compartilhado/dados.js'
import { registrarControladores } from './controladores.js'
import { registrarDiretivas } from './diretivas.js'
import { registrarServicos } from './servicos.js'

const angular = window.angular
const servicos = angular.module('casaDeMassagem.servicos', [])
const controladores = angular.module('casaDeMassagem.controladores', [servicos.name])
const diretivas = angular.module('casaDeMassagem.diretivas', [])
const app = angular.module('casaDeMassagem', [controladores.name, diretivas.name])

registrarServicos(servicos)
registrarControladores(controladores)
registrarDiretivas(diretivas)
app.filter('precoEmReais', () => formatarPreco)
