import z from "zod";

type MiddlewareFn<TAddedContext, TContext> = ({
	ctx,
}: {
	ctx: TContext;
}) => Promise<TAddedContext> | TAddedContext;

type BuilderState<Schema> = {
	inputSchema?: Schema;
	middlewares: MiddlewareFn<any, any>[];
};

type ActionHandler<TParsedInput, TContext, TResult> = ({
	parsedInput,
	ctx,
}: {
	parsedInput: TParsedInput;
	ctx: TContext;
}) => TResult;

type ValidationFields<TSchema extends z.ZodType | undefined> = TSchema extends z.ZodType
	? z.ZodFlattenedError<z.infer<TSchema>>
	: never;

type ActionError<TSchema extends z.ZodType | undefined> =
	| { type: "validation"; message: string; cause: ValidationFields<TSchema> }
	| { type: "middleware"; message: string; cause: unknown }
	| { type: "server"; message: string; cause: unknown };

type HandlerReturnResult<T, E = any> = Promise<
	| { data: T; error: undefined }
	| {
			data: undefined;
			error: E;
	  }
>;

const buildSafeServerAction = <
	TInput = unknown,
	TContext extends object = {},
	TSchema extends z.ZodType | undefined = undefined,
>(
	state: BuilderState<TSchema> = { middlewares: [] },
) => {
	return {
		inputSchema,
		use,
		handler,
	};

	/**
	 * Input parameter validation with zod, run before handler and after use().
	 */
	function inputSchema<TSchemaAdded extends z.ZodType>(schema: TSchemaAdded) {
		return buildSafeServerAction<z.infer<TSchemaAdded>, TContext, TSchemaAdded>({
			...state,
			inputSchema: schema,
		});
	}

	/**
	 * Use is method to apply middlewares function. these Middleware run before input and callback handler execution.
	 */
	function use<TAddedContext>(mw: MiddlewareFn<TAddedContext, TContext>) {
		return buildSafeServerAction<TInput, TContext & TAddedContext, TSchema>({
			...state,
			middlewares: [...state.middlewares, mw],
		});
	}

	function handler<TResult>(action: ActionHandler<TInput, TContext, TResult>) {
		/**
		 * This callback handler function
		 */
		return async function closureHandler(
			rawInput: TInput,
		): HandlerReturnResult<Awaited<TResult>, ActionError<TSchema>> {
			/**
			 * just middleware run before input
			 * parse input;
			 * run middleware
			 */

			let ctx = {} as TContext;

			for (const mw of state.middlewares) {
				try {
					const result = await mw({ ctx });
					ctx = {
						...ctx,
						...result,
					};
				} catch (err) {
					const errorMessage = err instanceof Error ? err.message : "Middleware error";
					return {
						data: undefined,
						error: {
							type: "middleware",
							message: errorMessage,
							cause: err,
						},
					};
				}
			}

			let parsedInput = rawInput;
			if (state.inputSchema) {
				const parseInputResult = state.inputSchema.safeParse(rawInput);

				if (!parseInputResult.success) {
					const errors = z.flattenError(parseInputResult.error);
					return {
						data: undefined,
						error: {
							type: "validation",
							message: "Validation Error",
							cause: errors as ValidationFields<TSchema>,
						},
					};
				}
				parsedInput = parseInputResult.data as TInput;
			}

			try {
				const result = await action({ parsedInput, ctx });
				return { data: result, error: undefined };
			} catch (err) {
				return {
					data: undefined,
					error: {
						type: "server",
						message: err instanceof Error ? err.message : "Server error",
						cause: err,
					},
				};
			}
		};
	}
};

export const createServerAction = () => {
	return buildSafeServerAction();
};
