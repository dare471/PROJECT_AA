import { namedLazy } from '@/7.shared/lib/hooks'

export const Templates = {
	Header: namedLazy(() => import('./header'), 'HeaderTemplate'),
	Main: namedLazy(() => import('./main'), 'MainTemplate'),
	Sidebar: namedLazy(() => import('./sidebar'), 'SidebarTemplate')
}
