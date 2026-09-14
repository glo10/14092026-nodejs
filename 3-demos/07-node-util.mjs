import { callbackify, promisify } from 'node:util'
import { createInterface as createInterfaceCB } from 'node:readline'
import { createInterface as createInterfacePromise } from 'node:readline/promises'
/**
 * Une fonction callback peut être transformé en promesse avec promisify(fn)
 * Une fonction sous forme de promesse peut être transformé en callback avec callbackify
 */

const appCBToPromise = promisify(createInterfaceCB(proccess.stdin, process.stdout))
const appPromiseToCB = callbackify(createInterfacePromise(process.stdin, process.stdout))