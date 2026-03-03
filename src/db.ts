export type UserTable = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
};
export type CompanyTable = {
  id: string;
  name: string;
};

export type CustomerDatabase = {
  users: UserTable;
  companies: CompanyTable;
};

type Price = number;

export type ProductTable = {
  id: string;
  name: string;
  description: string;
  unitPrice: Price;
};

export type CartTable = {
  id: string;
  items: ProductTable["id"][];
};

export type ShoppingDatabase = {
  carts: CartTable;
  products: ProductTable;
};

type EmptyContext<DB> = {
  /*
  * @deprecated type only, do not use at runtime
  */
  $db: DB
}

export const buildContext = <DB>() => {
  return {$db: undefined} as EmptyContext<DB>;
};

type SelectableContext<Ctx> = EmptyContext<Ctx> & {
  _operation: string;
  _table: keyof Ctx;
};

export const selectFrom = <
    Ctx extends EmptyContext<any>,
    TB extends keyof Ctx["$db"]>(ctx: Ctx, tableName: TB) => ({ // TODO use SelectableContext?
  ...ctx,
  _operation: "select",
  _table: tableName,
});

export const selectFields = <Ctx extends SelectableContext<any>>(
    ctx: Ctx,
    fieldNames: (keyof Ctx["$db"][Ctx["_table"]])[]
) => ({
  ...ctx,
  _fields: fieldNames,
});

export const selectAll = (ctx: any) => ({
  ...ctx,
  _fields: "ALL",
});

export const where = (ctx: any, field: any, operator: "=", value: any) => ({
  ...ctx,
  _where: {
    field,
    operator,
    value,
  },
});

export const deleteFrom = (ctx: any, tableName: any) => ({
  ...ctx,
  _operation: "delete",
  _table: tableName,
});
