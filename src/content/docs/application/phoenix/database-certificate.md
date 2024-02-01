---
title: Database Certificate
description: Enabling ssl connection for your database.
---

We recommend you enable the `ssl` option in your ecto configuration. We expose the database certificate from the infrastructure provider to your application. This guide shows you how to configure ssl / tls connectivity for your database.

In `config/runtime.exs` under the `:prod` configuration we recommend the following code snippet. When you selected the `postgresql` addon for your elixir / phoenix application. It automatically exposes `DATABASE_CERT_PEM` to your application.

```elixir title="config/runtime.exs"
if config_env() == :prod do
  # ...

  if cacert_pem = System.get_env("DATABASE_CERT_PEM") do
    %URI{host: db_host} = URI.parse(database_url)

    cacert_options =
      if cacert_pem do
        [
          cacerts:
            cacert_pem
            |> X509.from_pem()
            |> Enum.map(&X509.Certificate.to_der/1)
        ]
      else
        [
          cacertfile:
            System.get_env("DATABASE_CERT_PATH") || "/etc/ssl/cert.pem"
        ]
      end

    config :example_app, ExampleApp.Repo,
      ssl: true,
      url: database_url,
      ssl_opts:
        [
          verify: :verify_peer,
          server_name_indication: to_charlist(db_host),
          customize_hostname_check: [
            match_fun: :public_key.pkix_verify_hostname_match_fun(:https)
          ]
        ]
        |> Keyword.merge(cacert_options)
  else
    config :example_app, ExampleApp.Repo,
      url: database_url,
      socket_options: maybe_ipv6
  end

  # ...
end
```
