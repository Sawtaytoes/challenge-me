import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'

import App from '../components/App'
import ConfigAccessForClient from '../components/ConfigAccessForClient'
import Html from '../components/Html'
import ReactRenderTarget from '../components/ReactRenderTarget'
import ServerRoot from '../components/ServerRoot'

const server = ({
	__CONFIG__,
	config,
	request,
	response,
}) => {
	const context = {}

	const htmlString = (
		'<!DOCTYPE html>'
		.concat(
			renderToStaticMarkup(
				<Html
					htmlComponents={{
						body: (
							<ConfigAccessForClient
								windowConfig={__CONFIG__}
							/>
						),
						scripts: (
							<script
								defer
								src={
									'http://localhost'
									.concat(':')
									.concat(
										config
										.get('serverPort')
									)
									.concat('/client.main.bundle.js')
								}
							/>
						),
					}}
				>
					<ReactRenderTarget
						renderTargetId={
							config
							.get('reactRenderTargetId')
						}
					>
						{
							renderToString(
								<ServerRoot
									config={config}
									context={context}
									location={request.url}
								>
									<App />
								</ServerRoot>
							)
						}
					</ReactRenderTarget>
				</Html>
			)
		)
	)

	context.url
	? (
		response
		.redirect(
			301,
			context.url,
		)
	)
	: (
		response
		.send(htmlString)
	)
}

export default server
