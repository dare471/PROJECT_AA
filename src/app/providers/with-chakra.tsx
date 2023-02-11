import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~src/shared/lib'

export const withChakra = (component: () => React.ReactNode) => () =>
	<ChakraProvider theme={theme}>{component()}</ChakraProvider>
