// @flow

import type { ExtractReturn } from '.'

import createStore from '../createStore'
export type Store = ExtractReturn<typeof createStore>
