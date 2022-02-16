import { Component } from '@angular/core';
import { MonacoEditorLoaderService, MonacoStandaloneCodeEditor } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  editorOptions = {theme: 'vs-light', language: 'plsql'/*, readOnly: true*/};
  code: string = `begin
  var := 'a'||null; -- Noncompliant {{Review this concatenation with NULL value.}}
--            ^^^^

  var := 'a'||''; -- Noncompliant
--            ^^

  var := 'a'||'1';
end;`;

  constructor(private http: HttpClient, private monacoLoaderService: MonacoEditorLoaderService) {
    this.http = http;
    this.monacoLoaderService.isMonacoLoaded$.pipe(
      filter(isLoaded => isLoaded),
      take(1),
    ).subscribe(() => {
        monaco.languages.register({ id: 'plsql' });

        monaco.languages.setMonarchTokensProvider('plsql', {
          tokenizer: {
            root: [
              // identifiers and keywords
              [/[a-z_$][\w$]*/, { cases: {
                '@keywords': 'keyword',
                '@default': 'identifier' } }]
            ]
          },
          ignoreCase: true,
          defaultToken: "",
          tokenPostfix: ".plsql",

          keywords: ["all", "alter", "and", "any", "as", "asc", "begin", "between", "by", "check", "clusters", "cluster", "colauth", "columns", "complete", "compress", "connect", "crash", "create", "declare", "default", "desc", "distinct", "drop", "else", "end", "exception", "exclusive", "fetch", "for", "from", "goto", "grant", "group", "having", "identified", "if", "in", "increment", "index", "indexes", "initrans", "insert", "intersect", "into", "is", "like", "lock", "minus", "nocompress", "not", "nowait", "null", "of", "on", "option", "or", "order", "overlaps", "pctfree", "pctused", "procedure", "public", "resource", "revoke", "select", "share", "size", "some", "sql", "start", "tabauth", "tablespace", "then", "to", "union", "unique", "update", "values", "view", "views", "when", "where", "with", "out", "set", "table", "decimal", "type", "use", "range", "ref", "exists", "subtype", "refresh", "add", "mode", "groups", "array", "arrow", "at", "bulk", "compile", "current", "delete", "form", "prior", "record", "number", "others", "constant", "false", "true", "bfile", "blob", "clob", "nclob", "binary_double", "binary_float", "binary_integer", "dec", "double", "precision", "float", "int", "integer", "natural", "naturaln", "numeric", "pls_integer", "positive", "positiven", "real", "signtype", "smallint", "char", "character", "long", "raw", "nchar", "nvarchar2", "rowid", "string", "urowid", "varchar", "varchar2", "boolean", "date", "xmltype", "rowcount", "bulk_rowcount", "count", "first", "last", "limit", "next", "extend", "nextval", "currval", "elsif", "loop", "exit", "continue", "reverse", "while", "return", "returning", "nocopy", "replace", "external", "authid", "current_user", "definer", "language", "java", "function", "found", "notfound", "isopen", "commit", "work", "force", "comment", "write", "immediate", "batch", "wait", "rollback", "savepoint", "raise", "package", "body", "collect", "cursor", "rowtype", "the", "deterministic", "execute", "using", "open", "close", "pragma", "autonomous_transaction", "exception_init", "serially_reusable", "timestamp", "skip", "locked", "nocycle", "siblings", "nulls", "pipelined", "partition", "unbounded", "preceding", "following", "row", "rows", "over", "pipe", "any_cs", "charset", "extract", "xmlserialize", "document", "content", "encoding", "version", "no", "yes", "indent", "hide", "show", "defaults", "cast", "multiset", "local", "time", "zone", "xmlattributes", "schemacheck", "noschemacheck", "xmlelement", "entityescaping", "noentityescaping", "name", "evalname", "xmlforest", "xmlexists", "xmlquery", "xmlroot", "xmlcast", "xmlcolattval", "xmlparse", "xmlpi", "xmltable", "xmlnamespaces", "standalone", "wellformed", "passing", "ordinality", "path", "join", "rownum", "level", "sysdate", "read", "only", "constraint", "column", "operator", "indextype", "materialized", "mining", "model", "inner", "full", "left", "right", "outer", "cross", "global", "temporary", "preserve", "sort", "encrypt", "mod", "keep", "dense_rank", "interface", "sqlerrm", "byte", "interval", "year", "month", "day", "hour", "minute", "second", "editionable", "noneditionable", "trigger", "before", "after", "each", "enable", "disable", "referencing", "old", "new", "parent", "forward", "crossedition", "follows", "precedes", "admin", "delegate", "container", "hierarchy", "varray", "varying", "parallel_enable", "result_cache", "relies_on", "listagg", "within", "escape", "trim", "leading", "trailing", "both", "debug", "reuse", "settings", "specification", "rename", "connect_by_root", "forall", "indices", "save", "exceptions", "restrict_references", "transaction", "segment", "isolation", "serializable", "committed", "synonym", "member", "a", "empty", "submultiset", "except", "merge", "log", "errors", "reject", "unlimited", "matched", "aggregate", "case", "sequence", "maxvalue", "minvalue", "nocache", "noorder", "cycle", "cache", "references", "cascade", "primary", "key", "foreign", "object", "under", "final", "instantiable", "overriding", "static", "map", "constructor", "self", "result", "session", "role", "none", "xmlagg", "offset", "percent", "ties", "compound", "instead", "statement", "nested", "schema", "pluggable", "database", "analyze", "associate", "disassociate", "statistics", "audit", "noaudit", "truncate", "ddl", "startup", "shutdown", "db_role_change", "servererror", "logon", "logoff", "suspend", "clone", "unplug", "value", "sharing", "metadata", "collation", "using_nls_comp", "accessible", "less", "more", "than", "overflow", "subpartition", "subpartitions", "store", "lob", "storage", "now", "chunk", "pctversion", "retention", "freepools", "reads", "logging", "nologging", "initial", "minextents", "maxextents", "pctincrease", "freelists", "freelist", "optimal", "buffer_pool", "recycle", "element", "substitutable", "levels", "mapping", "nomapping", "hash", "partitions", "list", "template", "treat", "library", "agent", "context", "parameters", "tdo", "indicator", "struct", "length", "duration", "maxlen", "charsetid", "charsetform", "reference", "error", "without", "inline", "udf", "deprecate"]
        });
    });
   }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.http.post<Issue[]>('/api/analyze', this.code).subscribe(res => {
      let issues = res.map(issue => {
        return {
          range: new monaco.Range(issue.startLine, issue.startColumn, issue.endLine, issue.endColumn),
          options: {
            inlineClassName: 'bg-red-300'
          },
          message: issue.message
        }
      });

      editor.deltaDecorations(
        [],
        issues
      );

      monaco.languages.registerHoverProvider('plsql', {
        provideHover: function (model, position) {
          let foundIssues = [];
          let range = undefined;
          for (let issue of issues) {
            if (issue.range.containsPosition(position)) {
              range = issue.range;
              foundIssues.push(issue.message)
            }
          }

          if (foundIssues.length > 0) {
            return {
              range: range,
              contents: foundIssues.map(i => {
                return { value: i }
              })
            }
          }
          return null;
        }
      });
    });
  }
}

interface Issue {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
  message: string;
}
