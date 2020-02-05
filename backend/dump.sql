--
-- Estrutura para tabela `urls`
--

CREATE TABLE `urls` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `status` int(11) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `urls_log`
--

CREATE TABLE `urls_log` (
  `id` int(11) NOT NULL,
  `id_url` int(11) NOT NULL,
  `response_code` int(11) NOT NULL,
  `response_msg` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(200) NOT NULL,
  `last_login` datetime DEFAULT CURRENT_TIMESTAMP,
  `expired_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `token`, `last_login`, `expired_at`, `created_at`, `updated_at`) VALUES
(12, 'Administrador', 'admin@admin.com', 'admin', '$2a$08$RnsERyMEBTpIU5iIX460/O81sZIzNHPiih75eAex/uyoU2VUQkN.i', '$2a$08$uexuUTBX1I59tIu0x09MmemxSJiLTNbaquwZ.MDo9o/eHhNOlMVki', '2020-02-05 19:50:59', '2020-02-06 01:50:59', '2020-02-05 14:09:01', '2020-02-05 14:09:01');

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `urls`
--
ALTER TABLE `urls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Índices de tabela `urls_log`
--
ALTER TABLE `urls_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_url_id` (`id_url`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `urls`
--
ALTER TABLE `urls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de tabela `urls_log`
--
ALTER TABLE `urls_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `urls`
--
ALTER TABLE `urls`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `urls_log`
--
ALTER TABLE `urls_log`
  ADD CONSTRAINT `fk_url_id` FOREIGN KEY (`id_url`) REFERENCES `urls` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
 